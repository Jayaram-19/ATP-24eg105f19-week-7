async function testPublish() {
  try {
    const email = 'testauthor_unique_' + Date.now() + '@example.com';
    // 0. Register
    console.log("Registering...", email);
    const regRes = await fetch('http://localhost:5000/auth/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'Author',
        email: email,
        password: 'password123',
        role: 'AUTHOR'
      })
    });
    console.log("Register response:", await regRes.json());

    // 1. Login
    console.log("Logging in...");
    const loginRes = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log("Login data:", loginData);
    const cookies = loginRes.headers.get('set-cookie');
    console.log("Cookies:", cookies);
    
    if (loginRes.status !== 200) {
      console.log("Failed to login. Stopping.");
      return;
    }

    // 2. Publish
    console.log("Publishing article...");
    const formData = new FormData();
    formData.append('title', 'Test Article Title');
    formData.append('category', 'Technology');
    formData.append('content', 'This is a test article content with more than 50 characters to pass the validation on the frontend, although backend might not care about 50 chars.');
    
    // We don't add the boundary manually for fetch, it does it automatically if we pass FormData
    const postRes = await fetch('http://localhost:5000/author-api/article', {
      method: 'POST',
      headers: {
        Cookie: cookies
      },
      body: formData
    });
    
    console.log("Post status:", postRes.status);
    const postData = await postRes.json();
    console.log("Post response:", postData);
  } catch (err) {
    console.error("Error:", err);
  }
}

testPublish();
