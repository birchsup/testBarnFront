import React, { useState } from 'react';
import './createTestCase.css';
import {link} from "../ngrock";

const CreateTestCase = () => {
    const [testCase, setTestCase] = useState({
        name: '',
        preconditions: '',
        priority: '',
        isAutomated: 'want to automate',
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
        const response = await fetch(`${link}/testcases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
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
        <div className="test-case-container">
            <form onSubmit={handleSubmit} className="test-case-form">
                <div className="test-case-detail">
                    <div className="form-group">
                        <label>Priority:</label>
                        <input type="text" name="priority" value={testCase.priority} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Is Automated:</label>
                        <select name="isAutomated" value={testCase.isAutomated} onChange={handleChange}>
                            <option value="want to automate">Want to automate</option>
                            <option value="can't be automated">Can't be automated</option>
                            <option value="automated">Automated</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Created By:</label>
                        <input type="text" name="created_by" value={testCase.created_by} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Created At:</label>
                        <input type="date" name="created_at" value={testCase.created_at} onChange={handleChange} required />
                    </div>
                </div>
                <div className="test-case-steps">
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={testCase.name} onChange={handleChange} required />
                        <label>Preconditions:</label>
                        <textarea name="preconditions" value={testCase.preconditions} onChange={handleChange} rows="3" />
                    </div>
                    {testCase.steps.map((step, index) => (
                        <div key={index} className="form-group-step">
                            <label>Step {index + 1}</label>
                            <div className="step-row">
                                <textarea className="action-field" name="action" placeholder="Action"
                                          value={step.action} onChange={(e) => handleStepChange(index, e)} rows="3"
                                          required />
                                <textarea className="result-field" name="expected_result" placeholder="Expected Result"
                                          value={step.expected_result} onChange={(e) => handleStepChange(index, e)}
                                          rows="3" required />
                                {index === testCase.steps.length - 1 && (
                                    <button type="button" onClick={addStep} className="add-step-button">Add Step</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="create-button">Create</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTestCase;
