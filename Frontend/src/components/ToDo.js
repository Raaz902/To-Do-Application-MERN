import React, { useEffect, useState } from 'react';

export default function ToDo() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProducts();
                console.log(result);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/tasks');
        result = await result.json();
        setTasks(result);
        return result;
    };

    const addTask = async () => {
        if (!task) {
            alert("Enter Task");
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:8000/addtask", {
            method: "post",
            body: JSON.stringify({ task, userId, status: false }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        console.log(result);
        setTask('');
        getProducts();
    };

    const handleCheckboxChange = async (data) => {
        let result = await fetch(`http://localhost:8000/update/${data._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task: data.task, userId: data.userId, status: !data.status }),
        });
        result = await result.json();
        getProducts();
    };

    const deleteTask = async (data) => {
        const result = await fetch(`http://localhost:8000/delete/${data}`, {
            method: "DELETE",
        });
        getProducts();
        return result.ok;
    };

    const handleDragStart = (e, index) => {

        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();

        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);


        if (draggedIndex === targetIndex) {
            return;
        }

        const updatedTasks = [...tasks];
        const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
        updatedTasks.splice(targetIndex, 0, draggedTask);


        setTasks(updatedTasks);
    };

    return (
        <div className='todoDiv'>
            <h1 className='task-heading'>Enter your tasks here</h1>
            <input type="text" className='task-input' value={task} onChange={(e) => setTask(e.target.value)} />
            <button className='add-button' onClick={addTask}>Add Task</button>
            <table className='product_table'>
                <thead>
                    <tr>
                        <th className='action-header'>Action</th>
                        <th className='task-name-header'>Task Name</th>
                        <th className='status-header'>Status</th>
                        <th className='status-header'>Delete Task</th>
                    </tr>
                </thead>
                <tbody onDragOver={handleDragOver}>
                    {tasks ?
                        tasks.map((item, index) => (
                            <tr key={index + 1}
                                className={item.status ? 'completed-row' : 'pending-row'}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, index)}
                                draggable="true"
                            >
                                <td className='checkbox-cell'>
                                    <input type="checkbox" className='checkbox' checked={item.status} onChange={() => handleCheckboxChange(item)} />
                                </td>
                                <td className='task-cell'>{item.task}</td>
                                <td className='status-cell'>{item.status === false ? "Pending" : 'Done ✅'}</td>
                                <td className='status-cell'><button onClick={() => deleteTask(item._id)}>Delete</button></td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </table>
        </div>
    );
}

