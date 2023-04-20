#include "httplib.h"
#include <iostream>
#include <fstream>
#include <unordered_set>
#include <ctime>
#include <cstdlib>

std::unordered_set<std::string> used_ids;

httplib::Response withId(const httplib::Request& req) {
    auto student_id = req.get_param_value("student_id");

    if (used_ids.find(student_id) != used_ids.end()) {
        httplib::Response res;
        res.status = 200;
        res.set_content(R"({"error": "该学号已经抽过题目，请勿重复抽题！"})", "application/json");
        return res;
    }

    std::srand(std::time(0));
    int question = std::rand() % 30 + 1;

    used_ids.insert(student_id);

    std::ofstream id_file("used_ids.txt", std::ios::app);
    id_file << student_id << std::endl;
    id_file.close();

    std::string json = "{\"question\": " + std::to_string(question) + "}";
    httplib::Response res;
    res.status = 200;
    res.set_content(json, "application/json");
    return res;

}

int main() {
    httplib::Server server;

    server.Get("/api/withid", [](const httplib::Request& req, httplib::Response& res) {
        res = withId(req);
    });

    server.listen("localhost", 8000);
}
