package database

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
    "github.com/trioxtron/to-go/todo"
)

func DbInit() *gorm.DB {
    db, err := gorm.Open("mysql", "root:root@tcp(db:3306)/todolist?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Database connection initialized succesfully")

    db.Debug().DropTableIfExists(&todo.Todo{})
    db.Debug().AutoMigrate(&todo.Todo{})
    fmt.Println("Database migrated succesfully")

	return db
}
