// main.cpp
#include <oatpp/web/protocol/http/incoming/Request.hpp>
#include <oatpp/web/protocol/http/outgoing/Response.hpp>
#include <oatpp/web/protocol/http/Http.hpp>
#include <sstream> // 包含stringstream
#include "oatpp/web/server/HttpConnectionHandler.hpp"
#include "oatpp/network/tcp/server/ConnectionProvider.hpp"
#include "oatpp/network/Server.hpp"
#include "handler.h"
#include <cmath> // 引入cmath头文件以使用 std::pow

std::shared_ptr<oatpp::web::protocol::http::outgoing::Response> squareNumber(const std::shared_ptr<oatpp::web::protocol::http::incoming::Request>& request) {
  auto numberParam = request->getQueryParameter("number");
  int number = std::stoi(numberParam->c_str());
  int square = std::pow(number, 2);

  std::stringstream json;
  json << "{\"square\": " << square << "}";
  
  return oatpp::web::protocol::http::outgoing::ResponseFactory::createResponse(oatpp::web::protocol::http::Status::CODE_200, json.str().c_str());
}



void run()
{
    // 为 HTTP 请求创建路由器
    auto router = oatpp::web::server::HttpRouter::createShared();

    // 路由 GET - "/hello" 请求到处理程序
    router->route("GET", "/hello", std::make_shared<Handler>());
    router->route("GET", "/api/square", std::make_shared<oatpp::web::server::handler::Closure>(*squareNumber));
    // 创建 HTTP 连接处理程序
    auto connectionHandler = oatpp::web::server::HttpConnectionHandler::createShared(router);

    // 创建 TCP 连接提供者
    auto connectionProvider = oatpp::network::tcp::server::ConnectionProvider::createShared({"localhost", 8001, oatpp::network::Address::IP_4});

    // 创建服务器，它接受提供的 TCP 连接并将其传递给 HTTP 连接处理程序
    oatpp::network::Server server(connectionProvider, connectionHandler);

    // 打印服务器端口
    OATPP_LOGI("MyApp", "Server running on port %s", connectionProvider->getProperty("port").getData());

    // 运行服务器
    server.run();
}


int main()
{
    // 初始化 oatpp 环境
    oatpp::base::Environment::init();

    // 运行应用
    run();

    // 销毁 oatpp 环境
    oatpp::base::Environment::destroy();

    return 0;
}