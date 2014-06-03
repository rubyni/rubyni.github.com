require "rubygems"
require "sinatra/base"
require "mandrill"
require "json"


class App < Sinatra::Base


	before do

		content_type :json 
     
	   headers 'Access-Control-Allow-Origin' => '*', 
	           'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
	           'Access-Control-Allow-Headers' => 'Content-Type'

	end

	set :protection, false

	helpers do

 	 	def send_email(params, user)
 	 		m = Mandrill::API.new
        	message = {  
         		:subject=> params["subject"],  
         		:from_name=> params["name"],  
         		:text=> params["message"],  
         		:to=> [{
							:email =>	user.email,
							:name => user.name
					}	],  	
    		     :html=>"<html>#{params["message"]}</html>",  
         		:from_email=>params["email"]  
        	}

        	if ENV['MANDRILL_APIKEY']  
   				sending = m.messages.send message
   				sending
   			else
   				puts "Please add and environment variable for Mandrill Key"
   			end 
  		end

	end

    options "/user" do
    	200
    end


    post "/user" do
    	content_type :json

    	params = JSON.parse(request.body.read)

    	user = User.first(uuid: params["uuid"])
    	unless user
		 "User not found, 406"
		end

		if user
		
			status = send_email(params, user)
  	
			if status[0]['status'] != 'sent'				
				puts "There is an error"
				return {message: "The message could not be sent"}.to_json
			else
				"Your message has been successfully sent"
			end	

		end

   		halt 200, {message: "Message sent"}.to_json
    end


	get "/" do
		redirect ENV['REDIRECT_URL'] || 'http://kakaomedia.com'
	end

	post "/register" do
		user = User.first(email: params[:email])
		if user
			"The user is already registered"
		else 
			@user = User.create(name: params[:name], email: params[:email], url: params[:url], uuid: UUID.generate)
			"Token: #{@user.uuid} "
		end
	end

	post "/user/:uuid" do |uuid|
		

		user = User.first(uuid: uuid)
		unless user
		 "User not found, 406"
		end
		status = send_email(params, user)
  	
		if status[0]['status'] != 'sent'
			puts "There is an error"		
		else
			"Your message has been successfully sent"
		end	

		redirect user.url	

	end

	


end



