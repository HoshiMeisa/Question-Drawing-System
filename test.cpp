#include "oatpp/network/Server.hpp"
#include "oatpp/web/server/HttpConnectionHandler.hpp"
#include "oatpp/core/macro/component.hpp"
#include "oatpp/web/server/api/ApiController.hpp"

class MyController : public oatpp::web::server::api::ApiController {
public:
  MyController(const std::shared_ptr<ObjectMapper>& objectMapper)
    : oatpp::web::server::api::ApiController(objectMapper)
  {}

  ENDPOINT("GET", "/", root) {
    return createResponse(Status::CODE_200, "Hello, Oat++!");
  }
};

void run() {
  auto objectMapper = oatpp::parser::json::mapping::ObjectMapper::createShared();
  auto router = oatpp::web::server::HttpRouter::createShared();
  auto myController = std::make_shared<MyController>(objectMapper);

  myController->addEndpointsToRouter(router);

  auto connectionHandler = oatpp::web::server::HttpConnectionHandler::createShared(router);
  auto server = oatpp::network::Server::createShared({"localhost", 8000, oatpp::network::Address::IP_4}, connectionHandler);

  server->run();
}

int main() {
  oatpp::base::Environment::init();
  run();
  oatpp::base::Environment::deinit();
  return 0;
}
