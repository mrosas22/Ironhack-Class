import React, {Component} from 'react'

class StudentsList extends Component {
    constructor(){
        super();
        this.state = {
            students: ['Camilo', 'Chris', 'Will', 'Miller']
        }
    }
    addStudent (){
        const newStudent = prompt ('What/s the name of the student')
        const {students} = this.state
        //Make a copy of the array
        const studentsCopy = [...students];
        //push new studnet to copy array
        studentsCopy.unshift(newStudent)
        this.setState({
            students: studentsCopy
        })
    }
    deleteStudent (whichOne){
        console.log('Which student I am deleting')
        const {students} = this.state
        //Make a copy of the array
        const studentsCopy = [...students];
        //remove element from array
        studentsCopy.splice(whichOne,1);//whichOne is the index and 1 is the number of elements to remove
        //update the state
        this.setState({
            students: studentsCopy
        })

    }

    render(){
        const {students} = this.state;
        return(
        <div>
            <button onClick = {() => this.addStudent()} > Add new Student</button>
            <ul>
                {students.map((oneStudent, index) => {
                    return(
                        <li key={index}> 
                        {oneStudent}
                            <button onClick={() => this.deleteStudent(index)}>Delete</button>
                        </li>
                    )
            })}
            </ul>
        </div>
        )
    }
}

export default StudentsList;