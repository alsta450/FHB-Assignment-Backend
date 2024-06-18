const request = require("supertest");
const express = require("express");
const app = require("./index"); // Pfad zu Ihrer Express-App

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
