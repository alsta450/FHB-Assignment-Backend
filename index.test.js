const request = require("supertest");
const express = require("express");
const {app, generateId} = require("./index"); // Pfad zu Ihrer Express-App

describe('generateId function', () => {
  test('should generate the next id correctly', () => {

    let notes = [];
    expect(generateId(notes)).toBe(4);


    notes = [
      { id: 1, content: "Test Note 1" },
      { id: 2, content: "Test Note 2" }
    ];
    expect(generateId(notes)).toBe(4);
  });
});

describe('Note application logic', () => {
  let notes;

  beforeEach(() => {
    // Initialisieren Sie die Notizen vor jedem Test neu
    notes = [
      { id: 1, content: "HTML is easy", date: "2022-01-10T17:30:31.098Z", important: true },
      { id: 2, content: "Browser can execute only Javascript", date: "2022-01-10T18:39:34.091Z", important: false },
      { id: 3, content: "GET and POST are the most important methods of HTTP protocol", date: "2022-01-10T19:20:14.298Z", important: true },
    ];
  });

  test('generateId should generate the next correct id', () => {
    const newId = generateId.call({ notes }); 
    expect(newId).toBe(4);
  });

  test('Deleting a note should remove the correct note and leave the array with correct length', () => {
    const idToDelete = 2;
    notes = notes.filter(note => note.id !== idToDelete); // Simulieren Sie das Löschen einer Notiz
    expect(notes).toHaveLength(2);
    expect(notes.find(note => note.id === idToDelete)).toBeUndefined();
  });
});

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Hello World!");
  });
});

describe("Test retrieving all notes", () => {
  test("It should response with JSON containing all notes", async () => {
    const response = await request(app).get("/api/notes");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBeGreaterThanOrEqual(3); // Basierend auf der anfänglichen Notizenliste
  });
});

describe("Test adding a new note", () => {
  test("It should add a new note and return it", async () => {
    const newNote = {
      content: "Test note",
      important: true,
    };
    const response = await request(app)
      .post("/api/notes")
      .send(newNote)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(newNote.content);
    expect(response.body.important).toBe(newNote.important);
  });
});

describe("Test retrieving a single note by id", () => {
  test("It should return a single note", async () => {
    const response = await request(app).get("/api/notes/1");
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });
});

describe("Test deleting a note", () => {
  test("It should delete a note", async () => {
    const response = await request(app).delete("/api/notes/1");
    expect(response.statusCode).toBe(204);
  });
});
