package todo

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/gorm"
)

type Todo struct {
	gorm.Model
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}

func GetTodos(c *fiber.Ctx, db *gorm.DB) error {
	var todos []Todo
	db.Find(&todos)
	return c.JSON(todos)
}

func GetTodo(c *fiber.Ctx, db *gorm.DB) error {
	id := c.Params("id")
	var todo Todo
	db.Find(&todo, id)
	return c.JSON(todo)
}

func CreateTodo(c *fiber.Ctx, db *gorm.DB) error {
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		c.Status(503)
		return GetTodos(c, db)
	}
	db.Create(&todo)
	return GetTodos(c, db)
}

func DeleteTodo(c *fiber.Ctx, db *gorm.DB) error {
	id := c.Params("id")

	var todo Todo
	db.First(&todo, id)
	if todo.DeletedAt == nil {
		db.Delete(&todo)
		return GetTodos(c, db)
	}
	return GetTodos(c, db)
}

func UpdateTodo(c *fiber.Ctx, db *gorm.DB) error {
	id := c.Params("id")
	var todo Todo
	db.First(&todo, id)
	if todo.Completed == false {
		todo.Completed = true
		db.Save(&todo)
		return GetTodos(c, db)
	} else if todo.Completed == true {
		todo.Completed = false
		db.Save(&todo)
		return GetTodos(c, db)
	}
	return GetTodos(c, db)
}
