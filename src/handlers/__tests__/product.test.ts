import request from "supertest";
import { server } from "../../server";

describe("Testing in Product API / POST", () => {
  // POST VALIDATE
  it("should send back a status 400 , send an invalid parameter", async () => {
    const res = await request(server).post("/api/products/register").send({
      name: "Laptop",
      price: -1000, //parametro no valido
      stock: 10,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  // POST
  it("should send back a status 201 , json response", async () => {
    const res = await request(server).post("/api/products/register").send({
      name: "Laptop",
      price: 1000,
      stock: 10,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("Testing in Product API / GET", () => {
  // GET
  it("should send back a status 200 , json response", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("products");
    expect(res.status).not.toBe(404);
  });

  // GET BY ID
  it("should send back error 400 , send an invalid parameter", async () => {
    const res = await request(server).get("/api/products/asd");
    expect(res.status).not.toBe(200);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should send back error 404 , send parameter not found", async () => {
    const res = await request(server).get("/api/products/100");
    expect(res.status).not.toBe(200);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
  });

  // GET BY ID
  it("should send back a status 200 , json response", async () => {
    const res = await request(server).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("product");
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Testing in Product API / PUT / PATCH", () => {
  it("should send back error 400 , send an invalid parameter", async () => {
    const res = await request(server).put("/api/products/asd").send({
      name: "Laptop",
      price: 1000,
      stock: 10,
    });
    expect(res.status).not.toBe(200);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  })


  it("should send back error 404 , send parameter not found", async () => {
    const res = await request(server).put("/api/products/100").send({
      name: "Laptop",
      price: 1000,
      stock: 10,
    })

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto no encontrado");
  })


  it("should update a product by id ", async () => {
    const res = await request(server).put("/api/products/1").send({
      name: "Laptop - Nuevo",
      price: 1000,
      stock: 10,
    })

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto actualizado");
  })


  it("should update a product availability by id ", async () => {
    const res = await request(server).patch("/api/products/1")

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto actualizado");
  })
})

describe("Testing in Product API / DELETE", () => {
  it("should send back error 400 , send an invalid parameter", async () => {
    const res = await request(server).delete("/api/products/asd");
    expect(res.status).not.toBe(200);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  })

  it("should send back error 404 , send parameter not found ", async () => {
    const res = await request(server).delete("/api/products/400");
    expect(res.status).not.toBe(200);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto no encontrado");
  })

  it("should delete a product by id ", async () => {
    const res = await request(server).delete("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto eliminado");
  })
})
