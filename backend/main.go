package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jinzhu/gorm"
	"github.com/trioxtron/to-go/database"
	"github.com/trioxtron/to-go/todo"
)

func routeSetup(db *gorm.DB) {
    app := fiber.New()
    app.Use(cors.New(cors.Config{
        AllowOrigins: "*",
    }))

    app.Get("/api/todos", func(c *fiber.Ctx) error {
        return todo.GetTodos(c, db)
    })
    app.Post("/api/todo", func(c *fiber.Ctx) error {
        return todo.CreateTodo(c, db)
    })
    app.Get("/api/todo/:id", func(c *fiber.Ctx) error {
        return todo.GetTodo(c, db)
    })
    app.Delete("/api/todo/:id", func(c *fiber.Ctx) error {
        return todo.DeleteTodo(c, db)
    })
    app.Patch("/api/todo/:id", func(c *fiber.Ctx) error {
        return todo.UpdateTodo(c, db)
    })
    app.Listen(":4000")
}

func main() {
	db := database.DbInit()
	defer db.Close()

    routeSetup(db)
}
