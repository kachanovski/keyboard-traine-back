KEYBOARD API

Запускается на 5000 или 5001 порту

Валидации на серве еще нет, поэтому нужно реализовать ее на фронте)


                            ADMIN ACCOUNT 
                            login: admin@admin.com
                            password: password

/AUTH\

GET/auth

password must be more 5 symbols

PUT/reset-password 
        req{
            email: string
            password: string
            }
        res{
            'password updated'
            }


POST/login req{ email: string password: string rememberMe?: boolean }

    res{
        "data":
         {
        "id": "601d57de28b11e2600495574",
        "email": "test_email_3",
        "rememberMe": false
        },
        "message": "Login success",
        "statusCode": 201
    }

POST/register 
        req{
            "email": "test_email_3",
            "password" : "12341234"
           }

    res {
        "message": "User created",
        "body": 
            {
        "_id": "601db06b1f47bb45b8956ca6",
        "email": "test_email_5",
        "rememberMe": false,
        "__v": 0
            }
    }

DELETE/logout

/CARDS\
query обязательно
GET/card?category=category_name

res{
"message": "cards",
count: number
"cards":
[
{
"_id": "601c2ae147d1c70ee40729ad",
"author": "author_name",
"code": "some_code",
"created": "2021-02-04T17:12:01.202Z",
"updated": "2021-02-04T17:12:01.202Z",
"__v": 0 }
]
}

POST/card

    req{
        "author": "author_name",
        "code" : "some_code",
        "category": "code_category"
        }

    res{
        "message": "Card added",
        "statusCode": 201    
    }
DELETE/card
only admin account
        req: {id: card_id}

PUT/card
only admin account
        req: {author?: string, code?: string,category?: string}


//QUIZ\\

В качастве quizImgQuestion, подходят любые форматы изображения, вечом не более 3мб

POST/quiz

    req {
         "question": srting,
         "quizImgQuestion"?:"string"
         "answer" : {
                            "right": "string",
                            "wrong": [string]
                            },
         "answer_description": "string",
         "category": srting
        }

    res {
            "message": "QuizQuestion added",
            "imgQuestion": "uploads\\quiz\\1612978846379-quizImgQuestion.png",
            "quiz": {
                        "question": "question1",
                        "answer" : {
                            "right": "right answer",
                            "wrong": ["wrong answer","wrong answer 2"]
                                 },
                        "answer_description": "description",
                        "category": "category"
                    },
            "statusCode": 201
        }

GET/quiz

    req {}

    res {
            [
                {
                    "_id": "6023e778a0248f2c3cf4ba1c",
                    "question": "question1",
                    "rightAnswer": "right",
                    "wrongAnswers": ["wrong"],
                    "category": "category",
                    "created": "2021-02-10T14:02:32.913Z",
                    "updated": "2021-02-10T14:02:32.913Z",
                    "__v": 0
                },
            ]
        }

DELETE/quiz
only admin account
        req: {id: quiz_id}

PUT/card
only admin account
        req: { "id": "60317412eea3702b9ca55abf",
            "question": "what is done ",
            "imgQuestion": "",
            "answer": {
                    "right": "first update",
                    "wrong": ["second", "trirt", "fout"]
                     },
            "answer_description": "becouse update",
            "category": "array"



/RESULTS\
query параметры явлюяются обязательными
получаем топ 20 из определенной категории сортированными по лучшему времени
GET/results?category=Category_name

эти запросы могут делать только авторизованные пльзователи
GET/my-results?category=Category_name



POST/results 
    res{
        "message": "Result add",
        "statusCode": 201
        }

    req{
        "category": "Promise",
        "result": {
            "time": 10,
            "mistakes":4
                    }
        }

/PROFILE\

GET/profile