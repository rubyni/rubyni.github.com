require "rubygems"
require "sinatra/base"
require "mandrill"
#require "json"

class App < Sinatra::Base


	before do
		#puts '[Params]'
		#p params
	    #content_type :json

 		headers 'Access-Control-Allow-Origin' => '*', 
        'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
        'Access-Control-Allow-Headers' => 'Content-Type' 
	end

	set :protection, false

	helpers do

 	 	def send_email(params, user)
 	 		m = Mandrill::API.new
        	message = {  
         		:subject=> "Saliudar" params[:subject],  
         		:from_name=> "Gerardo"params[:name],  
         		:text=> "Hello bro"#params[:message],  
         		:to=> [{
							:email =>	user.email,
							:name => user.name
					}	],  
				 :html=>"<h1>Hello Worl</h1>"	
    		     #:html=>"<html>#{params[:message]}</html>",  
         		:from_email=>"g.ortega@gmail.com"#params[:email]  
        	}

        	if ENV['MANDRILL_APIKEY']  
   				sending = m.messages.send message
   				sending
   			else
   				puts "Hellowa"
   			end 
  		end

	end

	get "/" do
		redirect ENV['REDIRECT_URL'] || 'http://g3ortega.com'
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
		
		 headers 'Access-Control-Allow-Origin' => '*', 
        'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
        'Access-Control-Allow-Headers' => 'Content-Type' 

		user = User.first(uuid: uuid)
		unless user
		 "User not found, 406"
		end
		status = send_email(params, user)
  	
		if status[0]['status'] != 'sent'
			#raise ErrorSending
			puts sending
		else
			"Your message has been successfully sent"
		end	

		redirect user.url		
	end
	


end



