generate package.json
create .env file
create express app and assign the port number
connect to db
Define schema and create Models
        -UserTypeSchema
          firstName
          lastName
          email-->unique
          password
          role
          profileImageUrl
        -ArticleSchema
          author
          title
          category
          content
          comments
          isArticleActive
Implement APIs
create common api for register,login and logout