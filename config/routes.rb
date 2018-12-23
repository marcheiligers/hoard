Rails.application.routes.draw do
  # get 'home/index'
  # map.connect 'photo/*other', :controller => 'photos', :action => 'unknown',

  get '/*rest', controller: 'home', action: 'index'
  root 'home/index', controller: 'home', action: 'index'
end
