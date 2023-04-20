#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <ctime>
#include <cstdlib>

std::vector<int> load_answered_ids(const std::string& filename) {
    std::vector<int> answered_ids;
    std::ifstream infile(filename);
    std::string line;

    while (std::getline(infile, line)) {
        answered_ids.push_back(std::stoi(line));
    }

    return answered_ids;
}

void save_answered_ids(const std::string& filename, const std::vector<int>& ids) {
    std::ofstream outfile(filename);
    for (const auto& id : ids) {
        outfile << id << std::endl;
    }
}

bool is_id_answered(const std::vector<int>& answered_ids, int student_id) {
    for (const auto& id : answered_ids) {
        if (id == student_id) {
            return true;
        }
    }
    return false;
}

int main() {
    std::string answered_ids_file = "answered.txt";
    std::vector<int> answered_ids = load_answered_ids(answered_ids_file);

    int student_id;
    std::cout << "请输入学号: ";
    std::cin >> student_id;

    if (is_id_answered(answered_ids, student_id)) {
        std::cout << "禁止重复抽题" << std::endl;
        return 1;
    }

    std::srand(std::time(0));
    int image_index = std::rand() % 30 + 1;
    std::cout << "分配的题目图片编号为: " << image_index << std::endl;

    answered_ids.push_back(student_id);
    save_answered_ids(answered_ids_file, answered_ids);

    return 0;
}
