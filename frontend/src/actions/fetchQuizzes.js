export const fetchQuizzes = async (user, setQuizzes) => {
     // http://localhost:5000
  const apiEndpoint = '/api/getUserQuizzes';
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({ id: user.id }), 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes :(( ');
      }
  
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes :((', error.message);
    }
  };
  
