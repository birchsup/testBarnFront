import React, { useState } from 'react';
import './createTestCase.css';

const CreateTestCase = () => {
    const [testCase, setTestCase] = useState({
        name: '',
        preconditions: '',
        priority: '',
        isAutomated: false,
        steps: [
            { step: 1, action: '', expected_result: '' }
        ],
        created_by: '',
        created_at: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleStepChange = (index, e) => {
        const { name, value } = e.target;
        const newSteps = testCase.steps.map((step, i) =>
            i === index ? { ...step, [name]: value } : step
        );
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            steps: newSteps
        }));
    };

    const addStep = () => {
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            steps: [...prevTestCase.steps, { step: testCase.steps.length + 1, action: '', expected_result: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/testcases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: testCase.id, test: testCase })
        });

        if (response.ok) {
            alert('Test case created successfully!');
            // Clear form or redirect to another page
        } else {
            alert('Failed to create test case.');
        }
    };

    return (
        <div className="create-test-case">
            <h1>Create Test Case</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={testCase.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Preconditions:</label>
                    <input type="text" name="preconditions" value={testCase.preconditions} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Priority:</label>
                    <input type="text" name="priority" value={testCase.priority} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Is Automated:</label>
                    <input type="checkbox" name="isAutomated" checked={testCase.isAutomated} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Created By:</label>
                    <input type="text" name="created_by" value={testCase.created_by} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Created At:</label>
                    <input type="date" name="created_at" value={testCase.created_at} onChange={handleChange} required />
                </div>
                <div className="steps">
                    <h2>Steps</h2>
                    {testCase.steps.map((step, index) => (
                        <div key={index} className="form-group">
                            <label>Step {index + 1}</label>
                            <input type="text" name="action" placeholder="Action" value={step.action} onChange={(e) => handleStepChange(index, e)} required />
                            <input type="text" name="expected_result" placeholder="Expected Result" value={step.expected_result} onChange={(e) => handleStepChange(index, e)} required />
                        </div>
                    ))}
                    <button type="button" onClick={addStep}>Add Step</button>
                </div>
                <button type="submit">Create Test Case</button>
            </form>
        </div>
    );
};

export default CreateTestCase;
