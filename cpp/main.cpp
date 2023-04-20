#include <set>
#include <random>
#include "crow.h"

std::set<std::string> studentIds;

crow::response getRandomImage() {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(1, 30);

    int index = dis(gen);
    std::string imageUrl = "../images/" + std::to_string(index) + ".png";

    return crow::response(imageUrl);
}

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/check_student_id/<string>")
    ([](const crow::request& req, std::string studentId) {
        if (studentIds.find(studentId) != studentIds.end()) {
            return crow::response(400, "你已经抽过题了！");
        } else {
            studentIds.insert(studentId);
            return getRandomImage();
        }
    });

    app.port(8080).multithreaded().run();
}
