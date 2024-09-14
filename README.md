## Chat Bot Backend

This is the backend service for a chat bot application that utilizes MongoDB for data storage and the Google Generative AI for chat functionality. The backend is built using Node.js, Express.js, and Mongoose.

### Features

- **User Chat History**: Stores user chat history in MongoDB, allowing retrieval and continuation of conversations.
- **Google Generative AI Integration**: Utilizes Google Generative AI to generate responses based on user prompts.
- **REST API Endpoints**:
  - `GET /history/:userId`: Retrieves chat history for a specific user.
  - `POST /chat`: Sends a user's prompt to the chat bot and saves the conversation.

### Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling API requests.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Google Generative AI**: For generating chat responses.
- **MongoDB Atlas**: Cloud-based MongoDB service.
- **dotenv**: For managing environment variables.

### Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
