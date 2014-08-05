require "rubygems"
require "uuid"
require "data_mapper"
require "./app"
require "./db"
require "rack"
require "rack/contrib"

use Rack::PostBodyContentTypeParser

run App
