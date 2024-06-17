# CTM - Commit To Memory

Welcome to **Commit To Memory (CTM)**, an innovative EdTech project designed to help you learn and retain new words effectively using a system called interval learning. This application allows you to create, manage, and review word cards, facilitating long-term memory retention through a spaced repetition technique.

## Project Overview

CTM leverages the power of interval learning to ensure that the words you learn are committed to long-term memory. Here's how it works:

1. **Create a Card**: Users can create a card by adding a term and its definition. For example, if the term is "villain," the definition could be "the main bad character in a story, play, etc."

2. **Learn Words**: Navigate to the study page to review your cards. Each card has two sides: the definition side (which you see first) and the term side. Your task is to recall the term based on the definition provided.

3. **Track Progress**: Based on your recall ability, you can interact with the card using three options:
   - **Don't Remember**: Click this if you don't remember the term, decreasing the card's level.
   - **Still Learning**: Click this if you remember the term but are not confident enough to increase the level, keeping the card at its current level.
   - **Know**: Click this if you confidently remember the term, increasing the card's level.

### Importance of Changing Levels

The changing levels are crucial to the interval learning system. Here's why:

- **Adaptive Learning**: The system adapts to your learning pace. If you struggle with a term, the card appears more frequently, ensuring you get more practice. Conversely, if you remember a term well, the intervals between reviews increase, optimizing your study time and focusing on challenging terms.

- **Efficient Memory Retention**: By spacing out the reviews, CTM leverages the psychological spacing effect, which helps information move from short-term to long-term memory. The intervals are designed to review the term just before you're likely to forget it, reinforcing the memory.

- **Reduced Cognitive Load**: Instead of reviewing all terms repeatedly, you focus on those that need attention, making the learning process efficient and less overwhelming.

### Level Intervals

The levels and their respective intervals for review are as follows:
- Level 0: Review immediately
- Level 1: Review after 3 days
- Level 2: Review after 6 days
- Level 3: Review after 12 days
- Level 4: Review after 24 days
- Level 5: Review after 48 days
- Level 6: Considered mastered

By progressively increasing the intervals, CTM ensures that your learning is spaced out effectively, promoting long-term retention.

4. **Pronunciation and Visual Aids**: You can listen to the pronunciation of terms and definitions, and add pictures to create visual associations, enhancing memory retention.

5. **Manage Cards**: You can update, delete, and manage your cards anytime.

6. **User Accounts**: The application supports user registration, email confirmation, and sign-in to ensure personalized learning experiences.

## Technologies Used

### Front-End
- **React**: For building the user interface.
- **Material UI**: For component styling and design.
- **React hook form**: For handling form validation and submission.
- **axios**: For making HTTP requests.
- **yup**: For schema validation.
- **TypeScript**: For type checking and code robustness.

### Back-End
- **Node.js**: For building the server.
- **Express**: For handling server-side routing and middleware.
- **SendGrid API**: For sending email confirmations.
- **joi**: For schema validation.
- **jsonwebtoken**: For handling authentication.
- **MongoDB / Mongoose**: For database management.

## File Structure and Design Choices

### Front-End
- **src/components**: Contains reusable components.
- **src/pages**: Contains main pages.
- **src/api**: Contains API service functions for handling HTTP requests.
- **src/utils**: Contains utility functions.

### Back-End
- **routes**: Contains route handlers for user authentication and card management.
- **models**: Contains Mongoose schemas and models.
- **controllers**: Contains logic for handling requests and responses.
- **middleware**: Contains authentication middleware and validation functions.

### Design Choices
- **React Hook Form and Yup**: Chosen for their simplicity and efficiency in handling form validation and submission.
- **SendGrid API**: Selected for reliable email service.
- **MongoDB**: Chosen for its flexibility and scalability, which is essential for handling potentially large datasets.
