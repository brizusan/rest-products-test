import request from "supertest";
import { connectDB, server  } from "../server";
import db from "../config/db";

describe("Test en Server GET/API", () => {
  it("should send back a status 200 , json response", async () => {
    const res = await request(server).get("/api");
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Welcome to the API");

    // negacion
    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe("Bienvenido API");
  });
});

jest.mock("../config/db");

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate") // objeto - Metodo
      .mockRejectedValue(new Error("Database connection error")); //forzar error

    const consoleSpy = jest.spyOn(console, "log");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unable to connect to the database")
    );
  });
});
