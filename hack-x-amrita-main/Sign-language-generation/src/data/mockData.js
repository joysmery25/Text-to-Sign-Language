// Mock data structure: Subjects → Topics → Subtopics → Videos

export const mockData = {
  subjects: [
    { id: 1, name: 'Science', color: 'blue', icon: '🔬' },
    { id: 2, name: 'Technology', color: 'purple', icon: '💻' },
    { id: 3, name: 'Engineering', color: 'orange', icon: '⚙️' },
    { id: 4, name: 'Mathematics', color: 'green', icon: '📐' }
  ],

  topics: [
    // Science
    { id: 1, subjectId: 1, name: 'Physics', description: 'Laws of motion and forces' },
    { id: 2, subjectId: 1, name: 'Chemistry', description: 'Elements and reactions' },
    { id: 3, subjectId: 1, name: 'Biology', description: 'Living organisms and cells' },
    // Technology
    { id: 4, subjectId: 2, name: 'AI Basics', description: 'Introduction to artificial intelligence' },
    { id: 5, subjectId: 2, name: 'Programming', description: 'Code fundamentals' },
    { id: 6, subjectId: 2, name: 'Data Science', description: 'Working with data' },
    // Engineering
    { id: 7, subjectId: 3, name: 'Mechanical', description: 'Machines and mechanics' },
    { id: 8, subjectId: 3, name: 'Electrical', description: 'Electricity and circuits' },
    { id: 9, subjectId: 3, name: 'Civil', description: 'Structures and buildings' },
    // Mathematics
    { id: 10, subjectId: 4, name: 'Algebra', description: 'Variables and equations' },
    { id: 11, subjectId: 4, name: 'Geometry', description: 'Shapes and space' },
    { id: 12, subjectId: 4, name: 'Calculus', description: 'Rates of change' }
  ],

  subtopics: [
    // Physics subtopics
    { id: 1, topicId: 1, title: 'Newton\'s First Law', description: 'Newton’s first law states that a body remains at rest or in uniform motion unless acted upon by an external force. This law is also known as the law of inertia. An object at rest will stay at rest, and an object in motion will continue moving at constant speed in a straight line unless a force changes its state. For example, a book on a table will not move unless someone pushes it. Similarly, a moving ball will stop only when friction or another force acts on it.', image: '📦', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, topicId: 1, title: 'Newton\'s Second Law', description: 'Newton’s second law explains the relationship between force, mass, and acceleration. It states that force is equal to mass multiplied by acceleration. This means that the acceleration of an object depends on the force applied and its mass. If more force is applied, the object accelerates more. If the mass is larger, more force is required to produce the same acceleration. This law helps us understand how objects move when a force acts on them.', image: '⚡', videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0' },
    { id: 3, topicId: 1, title: 'Newton\'s Third Law', description: 'Newton’s third law states that for every action, there is an equal and opposite reaction. This means that when one object applies a force on another object, the second object applies an equal force in the opposite direction. For example, when we walk, our feet push the ground backward, and the ground pushes us forward. Similarly, rockets move upward because gases are pushed downward.', image: '🎯', videoUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0' },

    // Chemistry subtopics
    { id: 4, topicId: 2, title: 'Periodic Table', description: 'The periodic table is a chart that organizes all chemical elements. Elements are arranged based on their atomic number and properties. Each element has a unique symbol and atomic number. The table is divided into rows called periods and columns called groups. Elements in the same group have similar chemical properties. Metals are placed on the left side, non-metals on the right side, and metalloids in between. The periodic table helps scientists understand the structure and behavior of elements.', image: '🧪', videoUrl: 'https://www.youtube.com/embed/jHNkBrIGm4M' },
    { id: 5, topicId: 2, title: 'Chemical Reactions', description: 'A chemical reaction occurs when two or more substances combine to form new substances. During a reaction, atoms rearrange to create different molecules. Chemical reactions can release energy or absorb energy. Common examples include burning, rusting, and digestion. In a reaction, reactants are converted into products. Chemical equations are used to represent these changes. Understanding chemical reactions helps us explain many natural and industrial processes.', image: '🔥', videoUrl: 'https://www.youtube.com/embed/kJqAi4jMnLg' },

    // Biology subtopics
    { id: 6, topicId: 3, title: 'Cell Structure', description: 'A cell is the basic unit of life. All living organisms are made of cells. Cells have different parts that perform specific functions. The nucleus controls the activities of the cell. The cytoplasm is the jelly-like substance inside the cell. The cell membrane protects the cell and controls the movement of substances. Plant cells also have a cell wall and chloroplasts. Understanding cell structure helps explain how living organisms grow and function.', image: '🧬', videoUrl: 'https://www.youtube.com/embed/URUJD5NEXC8' },
    { id: 7, topicId: 3, title: 'Photosynthesis', description: 'Photosynthesis is the process by which green plants make their own food. It occurs in the chloroplasts of plant cells. Plants use sunlight, carbon dioxide, and water to produce glucose and oxygen. Chlorophyll is the green pigment that absorbs sunlight. Oxygen is released as a by-product of this process. Photosynthesis is essential for life because it provides food and oxygen. It plays a key role in maintaining the balance of nature.', image: '🌿', videoUrl: 'https://www.youtube.com/embed/g8g8g8g8g8g' },

    // AI Basics subtopics
    { id: 8, topicId: 4, title: 'Machine Learning', description: 'Machine learning is a branch of artificial intelligence that enables computers to learn from data. Instead of being explicitly programmed, machines improve their performance by analyzing patterns. Data is used to train models so they can make predictions or decisions. There are different types of machine learning, such as supervised learning and unsupervised learning. Machine learning is widely used in applications like speech recognition, image processing, and recommendation systems. It helps computers solve problems by learning from experience.', image: '🤖', videoUrl: 'https://www.youtube.com/embed/aircAruvnKk' },
    { id: 9, topicId: 4, title: 'Neural Networks', description: 'Neural networks are computing systems inspired by the human brain. They consist of layers of connected nodes called neurons. Each neuron processes input data and passes the result to the next layer. Neural networks are used to recognize patterns in images, text, and speech. They are the foundation of deep learning. Training a neural network involves adjusting weights to improve accuracy. Neural networks are widely used in fields like healthcare, finance, and autonomous systems.', image: '🧠', videoUrl: 'https://www.youtube.com/embed/bcc4bHFGvKo' },

    // Programming subtopics
    { id: 10, topicId: 5, title: 'Variables', description: 'A variable is a named storage location used to store data in a program. It holds a value that can change during program execution. Each variable has a name, a data type, and a value. Common data types include integer, float, string, and boolean. Variables allow programmers to store and manipulate information. For example, a variable can store a number, a name, or a result of a calculation. Variables make programs flexible and dynamic.', image: '📝', videoUrl: 'https://www.youtube.com/embed/HyAX-TPtwFc' },
    { id: 11, topicId: 5, title: 'Functions', description: 'A function is a block of code designed to perform a specific task. It helps organize code into reusable components. Functions can accept input values called parameters and return an output. Using functions improves code readability and reduces repetition. A function is defined once and can be called multiple times. Functions help break large problems into smaller parts. They make programs easier to understand and maintain.', image: '🔧', videoUrl: 'https://www.youtube.com/embed/aZAWJtTXMas' },

    // Data Science subtopics
    { id: 12, topicId: 6, title: 'Data Visualization', description: 'Data visualization is the process of presenting data in graphical form. It helps people understand complex information easily. Charts, graphs, and tables are commonly used to display data. Visual representation makes patterns and trends more visible. Data visualization supports better decision making. It is widely used in business, research, and education. Tools like bar charts, line graphs, and pie charts help explain numerical data clearly.', image: '📊', videoUrl: 'https://www.youtube.com/embed/yOqXTipAUFI' },

    // Mechanical Engineering subtopics
    { id: 13, topicId: 7, title: 'Levers', description: 'A lever is a simple machine used to lift or move heavy objects. It consists of a rigid bar that rotates around a fixed point called the fulcrum. The force applied to the lever is called effort, and the load is the object being moved. Levers help reduce the amount of effort needed to lift a load. There are three types of levers based on the position of the fulcrum, load, and effort. Common examples include a seesaw, a crowbar, and a pair of scissors. Levers are widely used in mechanical systems to make work easier and more efficient.', image: '🏗️', videoUrl: 'https://www.youtube.com/embed/0YeKDm0Jzzc' },

    // Electrical Engineering subtopics
    { id: 14, topicId: 8, title: 'Circuits', description: 'An electrical circuit is a closed path through which electric current flows. It consists of components such as a power source, wires, and a load. The power source provides electrical energy, and the load uses that energy to perform work. A circuit must be closed for current to flow. Common components in a circuit include resistors, switches, and bulbs. Circuits can be classified as series circuits or parallel circuits. Electrical circuits are used in homes, industries, and electronic devices.', image: '⚡', videoUrl: 'https://www.youtube.com/embed/qfDKzw8PL3g' },

    // Civil Engineering subtopics
    { id: 15, topicId: 9, title: 'Bridges', description: 'A bridge is a structure built to cross obstacles such as rivers, valleys, or roads. Bridges allow people and vehicles to travel safely over these obstacles. They are important for transportation and communication. Bridges are designed to carry loads and withstand forces like wind and water flow. There are different types of bridges, including beam bridges, arch bridges, suspension bridges, and cable-stayed bridges. Engineers carefully select materials such as steel and concrete for construction. Bridges play a vital role in connecting cities and supporting economic development.', image: '🌉', videoUrl: 'https://www.youtube.com/embed/KEhOoLFKL3Y' },

    // Algebra subtopics
    { id: 16, topicId: 10, title: 'Linear Equations', description: 'A linear equation is an equation of the first degree. It contains variables raised to the power of one. The general form of a linear equation in one variable is ax + b = 0. Linear equations represent straight lines when plotted on a graph. They have only one solution in one variable. Linear equations can be solved using simple algebraic operations. These equations are used in real-life problems such as calculating cost and distance.', image: '📐', videoUrl: 'https://www.youtube.com/embed/MPIYKvDZXms' },
    { id: 17, topicId: 10, title: 'Quadratic Equations', description: 'A quadratic equation is an equation of the second degree. It contains a variable raised to the power of two. The standard form of a quadratic equation is ax² + bx + c = 0. Quadratic equations can have two real solutions, one real solution, or complex solutions. They can be solved using factorization, completing the square, or the quadratic formula. The graph of a quadratic equation is called a parabola. Quadratic equations are used in physics, engineering, and economics.', image: '🎯', videoUrl: 'https://www.youtube.com/embed/MHXO86wKeDY' },

    // Geometry subtopics
    { id: 18, topicId: 11, title: 'Triangles', description: 'A triangle is a three-sided polygon. It has three sides, three angles, and three vertices. The sum of the interior angles of a triangle is 180 degrees. Triangles are classified based on their sides as equilateral, isosceles, and scalene. They are also classified based on angles as acute, right, and obtuse triangles. The area of a triangle can be calculated using the formula one-half base multiplied by height. Triangles are widely used in construction, design, and engineering.', image: '△', videoUrl: 'https://www.youtube.com/embed/u4Pu3caw6Ac' },
    { id: 19, topicId: 11, title: 'Circles', description: 'A circle is a set of points that are at an equal distance from a fixed point called the center. The distance from the center to any point on the circle is called the radius. The diameter is twice the radius. The circumference is the boundary of the circle. The area of a circle is calculated using the formula pi multiplied by radius squared. Circles are used in wheels, clocks, and many mechanical systems. Understanding circles is important in mathematics and engineering.', image: '○', videoUrl: 'https://www.youtube.com/embed/6uacxOKQR7M' },

    // Calculus subtopics
    { id: 20, topicId: 12, title: 'Derivatives', description: 'A derivative measures the rate of change of a function with respect to a variable. It tells how a function changes at a specific point. The derivative is represented using symbols such as dy/dx. In geometry, the derivative represents the slope of a tangent line to a curve. In physics, derivatives are used to describe velocity and acceleration. Derivatives help analyze increasing and decreasing behavior of functions. They are widely used in science, engineering, and economics.', image: '📈', videoUrl: 'https://www.youtube.com/embed/9vKqVkMQHKk' },
    { id: 21, topicId: 12, title: 'Integrals', description: 'An integral represents the accumulation of quantities and the area under a curve. It is the reverse process of differentiation. Integrals are represented using the integral symbol. There are two main types: definite integrals and indefinite integrals. Definite integrals calculate the exact area between limits. Integrals are used in physics to calculate distance from velocity. They are also applied in engineering and probability. Integrals help solve problems involving total change and accumulation.', image: '📉', videoUrl: 'https://www.youtube.com/embed/rfG8ge9wtfw' }
  ]
}
