import React from 'react'
import history from '../../history'
import styled from 'styled-components'

const Comments = (props) => {
    return(
        <div style = {{paddingTop: '120px', paddingBottom: '20px'}}>
            <Div>
                
            </Div>
        </div>
    )
}

const Div = styled.div`
    box-shadow: 25px 25px 10px 0 rgba(0,0,0,0.4), 0 0 0 0 rgba(0,0,0,0.3);
    width: 86%;
    border-radius: 10px;
    margin-left: 7%;
    margin-right: 7%;
    min-height: 80vh;
    border: 2px solid #ccc;    
`

export {Comments}


