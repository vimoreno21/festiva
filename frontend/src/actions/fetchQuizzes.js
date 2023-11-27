export const fetchQuizzes = async (user, setQuizzes, navigate) => {
     // http://localhost:5000
  const apiEndpoint = '/api/getUserQuizzes';
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({ _id: user.id }), 
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem('user_data'))?.token
        },
      })

      
      const data = await response.json();
      if (response.status == 401) {
        navigate('/start');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes :(( ');
      }


      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes :((', error.message);
    }
  };
  
