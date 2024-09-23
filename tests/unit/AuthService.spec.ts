import { authService } from "../../services/authService";
import { describe, it, expect } from "@jest/globals";

const user = {
  username: "testuser",
  email: "test@example.com",
  password: "password123",
};

let token = "";

describe("Auth Service - Register", () => {
  it("should register a new user", async () => {
    const response = await authService.register(
      user.username,
      user.email,
      user.password
    );
    expect(response.status).toBe(201);
  });

  it("should register an already used email", async () => {
    try {
      await authService.register(user.username, user.email, user.password);
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        const axiosError = error as any;
        expect(axiosError.response.status).toBe(400);
      }
    }
  });
});

describe("Auth Service - Login", () => {
  it("should login with an unregistered user", async () => {
    try {
      await authService.login(user.email + "NAN", user.password + "NAN");
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        const axiosError = error as any;
        expect(axiosError.response.status).toBe(401);
      }
    }
  });

  it("should login a user", async () => {
    const response = await authService.login(user.email, user.password);
    expect(response.token).toBeDefined();
    expect(response.user).toBeDefined();
    token = response.token;
  });

  it("should delete a user without token", async () => {
    try {
        await authService.deleteUser(user.email, "");
    } catch (error) {
        if (error instanceof Error && (error as any).response) {    
        const axiosError = error as any;
        expect(axiosError.response.status).toBe(403);
        }
    }
  });

  it("should delete a user with invalid token", async () => {
    try {
        await authService.deleteUser(user.email, "invalidToken");
    } catch (error) {
        if (error instanceof Error && (error as any).response) {    
        const axiosError = error as any;
        expect(axiosError.response.status).toBe(403);
        }
    }
  });

  it("should delete a user", async () => {
    const response = await authService.deleteUser(user.email, token);
    expect(response.status).toBe(204);
  });

  it("should logout a user", async () => {
    authService.logout();
  });
});
