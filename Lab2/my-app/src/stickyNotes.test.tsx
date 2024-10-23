import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
test("renders create note form", () => {
render(<StickyNotes />);

const createNoteButton = screen.getByText("Create Note");
expect(createNoteButton).toBeInTheDocument();
});

test("creates a new note", () =>{
render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
const createNoteContentTextarea =
screen.getByPlaceholderText("Note Content");
const createNoteButton = screen.getByText("Create Note");

fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
fireEvent.change(createNoteContentTextarea, {
target: { value: "Note content" },
});
fireEvent.click(createNoteButton);

const newNoteTitle = screen.getByText("New Note");
const newNoteContent = screen.getByText("Note content");

expect(newNoteTitle).toBeInTheDocument();
expect(newNoteContent).toBeInTheDocument();
});
});

// test update ,delete and read

describe("Exercise 2.6.1 - Read, update, delete StickyNote", () => {
test("Read stickyNotes", () => {
render(<StickyNotes />);
for (const n of dummyNotesList) {
const noteTitle = screen.getByText(n.title);
const noteContent = screen.getByText(n.content);
expect(noteTitle).toBeInTheDocument();
expect(noteContent).toBeInTheDocument();
}
});
test("update stickyNotes", () => {
render(<StickyNotes />);
const noteTitle = screen.getByText(dummyNotesList[0].title);
fireEvent.change(noteTitle, {
target: { innerHTML: "title change" },
});
expect(noteTitle.innerHTML).toEqual("title change");
});
test("remove stickyNotes", () => {
const result = render(<StickyNotes />);
const button = result.container.querySelectorAll(".removeButton")[0];
fireEvent.click(button);
const title = screen.queryByText(dummyNotesList[0].title);
expect(title).toBeNull();
});
});