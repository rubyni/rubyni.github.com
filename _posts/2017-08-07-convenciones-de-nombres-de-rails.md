---
layout: post
title: Convenciones de nombres de Rails
category: cursos
published: true
---
## Convenciones generales Ruby ##

Los nombres de clase son `CamelCase`.

Los métodos y variables son `snake_case`.

Métodos con un sufijo `?` devolverá un booleano.

Métodos con un  sufijo`!` significa una de dos cosas: o el método funciona destructivamente de alguna manera, o aumentará y la excepción en lugar de fallar (tales como modelos Rails' `#save!` vs. `#save`).

En la documentación, `::method_name` denota un *método de clase*, mientras `#method_name` denota una *instancia de método*.

## Base de datos ##

*Tablas de base de datos* utilizan `snake_case`. Los nombres de las tablas son **plural**.

*Nombres de columnas* de la base de datos utilizan `snake_case`, pero generalmente son **singular**.

Ejemplo:

```
+--------------------------+
| bigfoot_sightings        |
+------------+-------------+
| id         | ID          |
| sighted_at | DATETIME    |
| location   | STRING      |
| profile_id | FOREIGN KEY |
+------------+-------------+

+------------------------------+
| profiles                     |
+---------------------+--------+
| id                  | ID     |
| name                | STRING |
| years_of_experience | INT    |
+---------------------+--------+
```

## Modelo ##

Modelo *nombres de clases* utiliza `CamelCase`. Estos son **singular**, y se asignará automáticamente al nombre de la tabla de base de datos plural.

Modelo *atributons* y *métodos* utiliza `snake_case` y hacer coincidir los nombres de columna en la base de datos.

Los archivos de modelo se almacenan en `app/models/#{singular_model_name}.rb`.

Ejemplo:

```ruby
# app/models/bigfoot_sighting.rb
class BigfootSighting < ActiveRecord::Base
  # Esta clase tendrá estos atributos: id, sighted_at, location
end
```
```ruby
# app/models/profile.rb
class Profile < ActiveRecord::Base
  # Los métodos siguen las mismas convenciones que los atributos
  def veteran_hunter?
    years_of_experience > 2
  end
end
```

### Relaciones en modelos ###

Uso de relaciones `snake_case` y seguir el tipo de relación, por lo que `has_one` y `belongs_to` son **singular** mientras `has_many` es **plural**.

Rails espera que las claves foráneas en la base de datos `_id` sufijo, y asignará las relaciones a esas llaves automáticamente si los nombres alinean para arriba.

Ejemplo:

```ruby
# app/models/bigfoot_sighting.rb
class BigfootSighting < ActiveRecord::Base
  # Esto sabe usar el campo profile_id en la base de datos
  belongs_to :profile
end
```
```ruby
# app/models/profile.rb
class Profile < ActiveRecord::Base
  # Esto sabe mirar la clase BigfootSighting y encontrar la clave externa en esa tabla
  has_many :bigfoot_sightings
end
```

## Controladores ##

Controladores *nombres de clases* utiliza `CamelCase` y tiene `Controller` como un sufijo. El sufijo `Controller` es siempre singular. El nombre del recurso suele ser **plural**.

Las *acciones* en los Controladores utilizan `snake_case` y normalmente coinciden con los nombres de ruta estándar que Rails define (`index`, `show`, `new`, `create`, `edit`, `update`, `delete`).

Los archivos de controladores se almacenan en `app/controllers/#{resource_name}_controller.rb`.

Ejemplo:

```ruby
# app/controllers/bigfoot_sightings_controller.rb
BigfootSightingsController < ApplicationController
  def index
    # ...
  end
  def show
    # ...
  end
  # etc
end
```

```ruby
# app/controllers/profiles_controller.rb
ProfilesController < ApplicationController
  def show
    # ...
  end
  # etc
end
```

## Rutas ##

Los nombres de las rutas son `snake_case`, y por lo general coinciden con el controlador. La mayoría de las veces las rutas son **plural** y usan el plural `resources`.

[Rutas singulares](http://edgeguides.rubyonrails.org/routing.html#singular-resources) Son un caso especial. Estos usan el singular `resource` Y un nombre de recurso singular. Sin embargo, todavía se asignan a un controlador plural por defecto!

Ejemplo:

```ruby
resources :bigfoot_sightings
# Los usuarios sólo pueden ver sus propios perfiles, por lo que utilizaremos `/ profile` en su lugar
# de poner un id en la URL.
resource :profile
```

## Vistas ##

Los nombres de archivo de vista, de forma predeterminada, coinciden con el controlador y la acción a la que están vinculados.

Los archivos de vistas se almacenan en `app/views/#{resource_name}/#{action_name}.html.erb`.

Ejemplo:

 * `app/views/bigfoot_sightings/index.html.erb`
 * `app/views/bigfoot_sightings/show.html.erb`
 * `app/views/profile/show.html.erb`

# Más recursos #

* [ActiveRecord nombres y convenciones de esquema (incluyendo nombres de columnas mágicas)](http://edgeguides.rubyonrails.org/active_record_basics.html#naming-conventions)
* [Mapa mental de las convenciones de Rails](https://teddicodes.files.wordpress.com/2015/02/railsnamingconventions.pdf)

## Fuente ##

[Rails naming conventions](https://gist.github.com/iangreenleaf/b206d09c587e8fc6399e)
