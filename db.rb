env = ENV["RACK_ENV"] || "development"
#url = ENV['DATABASE_URL'] ||  'postgres//testing:123456@localhost/static_mailer'

DataMapper.setup :default, {
	:adapter => 'postgres',
	:host => 'localhost',
	:database => 'static_mailer',
	:user => 'testing',
	:password => '123456'
}

class User
	include DataMapper::Resource
	property :id,   	Serial
	property :email,	String,	key: true, length: 200
	property :name, 	String, length: 75
	property :uuid,		String, key: true, length: 36
	property :url, 		String, length: 75

end

DataMapper.finalize
DataMapper.auto_upgrade!
