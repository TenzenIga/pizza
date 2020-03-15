import React from 'react'
import { IStore } from '../interface/interface'
import { connect } from 'react-redux'

type errorProps = {
    error:string | null
}

function Error(props:errorProps) {
    
    return (
        props.error ?
        <div>
            <h1>{props.error}</h1>
        </div>
        :
        null
    )
}

const mapStateToProps =(state:IStore) =>({
    error:state.products.error
})

export default connect(mapStateToProps)(Error) 