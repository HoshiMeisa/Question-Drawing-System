#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <ctime>
#include <cstdlib>
#include <crow.h>
#include <boost/filesystem.hpp>
#include <rapidjson/document.h>
#include <rapidjson/error/en.h>
#include <rapidjson/stringbuffer.h>
#include <rapidjson/writer.h>
#include <boost/property_tree/json_parser.hpp>

using namespace crow;

// 读取题目列表
std::vector<std::string> read_question_list() {
    std::vector<std::string> list;
    for (int i = 1; i <= 30; i++) {
        std::string filename = "image/" + std::to_string(i) + ".jpg";
        if (boost::filesystem::exists(filename)) {
            list.push_back(filename);
        }
    }
    return list;
}

// 读取已抽取的题目列表
std::vector<std::pair<std::string, std::string>> read_selected_list() {
    std::vector<std::pair<std::string, std::string>> list;
    std::ifstream in("selected.txt");
    if (in) {
        std::string line;
        while (std::getline(in, line)) {
            std::size_t pos = line.find(',');
            if (pos != std::string::npos) {
                list.emplace_back(line.substr(0, pos), line.substr(pos+1));
            }
        }
    }
    return list;
}

// 保存已抽取的题目列表
void save_selected_list(const std::vector<std::pair<std::string, std::string>>& list) {
    std::ofstream out("selected.txt");
    for (auto& item : list) {
        out << item.first << "," << item.second << std::endl;
    }
}

// 从题目列表中随机选择一道题目
std::string select_question(const std::vector<std::string>& list,
                            const std::vector<std::pair<std::string, std::string>>& selected_list,
                            const std::string& student_id) {
    std::vector<std::string> available_list;
    for (auto& filename : list) {
        bool found = false;
        for (auto& item : selected_list) {
            if (item.first == student_id && item.second == filename) {
                found = true;
                break;
            }
        }
        if (!found) {
            available_list.push_back(filename);
        }
    }
    if (available_list.empty()) {
        return "";
    }
    std::srand(std::time(nullptr));
    int index = std::rand() % available_list.size();
    return available_list[index];
}

// 处理抽题请求
void handle_select_question(const request& req, response& res) {
    // 解析请求内容
    std::string body = req.body;
    boost::property_tree::ptree pt;
    std::stringstream ss(body);
    try {
        boost::property_tree::json_parser::read_json(ss, pt);
    } catch (const std::exception& e) {
        res.code = 400;
        res.body = "Invalid request body: " + std::string(e.what());
        return;
    }
    if (!pt.get_optional<std::string>("student_id")) {
        res.code = 400;
        res.body = "Invalid request body";
        return;
    }
    std::string student_id = pt.get<std::string>("student_id");
    // 从题目列表中随机选择一道题目
    std::vector<std::string> list = read_question_list();
    std::vector<std::pair<std::string, std::string>> selected = read_selected_list();
    std::string question = select_question(list, selected, student_id);
    if (question.empty()) {
        res.code = 404;
        res.body = "No available question";
        return;
    }
    // 记录已抽取的题目
    selected.emplace_back(student_id, question);
    save_selected_list(selected);
    // 构造响应内容
    boost::property_tree::ptree result;
    result.put("question", question);
    // 返回成功响应
    std::stringstream ss1;
    boost::property_tree::json_parser::write_json(ss1, result);
    res.code = 200;
    res.set_header("Content-Type", "application/json");
    res.body = ss1.str();
}

int main() {
    // 创建Web服务器
    SimpleApp app;
    CROW_ROUTE(app, "/select_question")
        .methods("POST"_method)
        ([](const request& req, response& res) {
            handle_select_question(req, res);
        });
    // 启动Web服务器
    app.port(8080).multithreaded().run();
    return 0;
}

