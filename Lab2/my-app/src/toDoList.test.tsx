import { render, screen, fireEvent } from "@testing-library/react";
//import { StickyNotes } from "./stickyNotes";
import { ToDoList } from "./toDoList";
//import { dummyNotesList } from "./constants";
import { dummyGroceryList} from "./constants"; 

describe("Test todoList", () => {

test("Read ToDoList", () => {
    render(<ToDoList />);
    
    
    for (const n of dummyGroceryList) {
        const item = screen.getByText(n.name);
        expect(item).toBeInTheDocument();
      }
  

   // });
    //expect(noteTitle.innerHTML).toEqual("title change");
  });


  test("test update title", () => {
    const result = render(<ToDoList />);
    const checkbox = result.container.querySelectorAll("input")[0];
    fireEvent.click(checkbox);
    const title = screen.getByText("Items bought: 1");
    expect(title).toBeInTheDocument();

 
    

  });
});