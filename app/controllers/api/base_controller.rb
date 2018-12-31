module Api
  class BaseController < ApplicationController
    # respond_to :json
    # before_action :json_request_format

    private

      def json_request_format
        request.format = :json
      end
  end
end
