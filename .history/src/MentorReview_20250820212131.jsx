import React, { useState, useEffect } from "react";

function MentorReview() {
  const [mentorReviews, setMentorReviews] = useState([
    {
      id: 1,
      mentor: "Dr. Reddy",
      feedback: "Excellent guidance for AI projects.",
      rating: 5,
    },
    {
      id: 2,
      mentor: "Ms. Sharma",
      feedback: "Resume Builder students had strong engagement.",
      rating: 4.8,
    },
    {
      id: 3,
      mentor: "Dr. Singh",
      feedback: "Provided insightful feedback on data projects.",
      rating: 4.5,
    },
  ]);

  const [newReviewMentor, setNewReviewMentor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState("");
  return <div></div>;
}

export default MentorReview;
