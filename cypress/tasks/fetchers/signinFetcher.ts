import axios from "axios";

export async function login(email: string, password: string) {
  const graphqlEndpoint = "http://localhost:3003/graphql"; // Replace with your GraphQL API URL

  const requestBody = {
    query: `
      mutation login($email: String!, $password: String!) {
        login(LoginInput: {
          email: $email
          password: $password
        }) {
          code
          message
          success
        }
      }
    `,
    variables: {
      email,
      password,
    },
  };

  try {
    const response = await axios.post(graphqlEndpoint, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    const cookies = response.headers["set-cookie"];

    return extractJwtTokenFromSetCookie(cookies);
  } catch (error) {
    console.error("An error occurred:", error);
    // You can handle the error here as needed
  }
}

function extractJwtTokenFromSetCookie(setCookieHeader) {
  if (Array.isArray(setCookieHeader)) {
    setCookieHeader = setCookieHeader.join("; ");
  }

  if (typeof setCookieHeader !== "string") {
    return null; // Invalid header format
  }

  const cookies = setCookieHeader.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName.trim() === "jwt") {
      // Adjust the cookie name to match your JWT token cookie
      return cookieValue;
    }
  }

  return null; // Return null if the token is not found
}
