import React from 'react'
import { IStore } from '../interface/interface'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'

type loadingProps = {
    loading:boolean
}

function Loading(props:loadingProps) {
    return (
        props.loading ?
        <Spinner className='mx-auto mt-5' animation="border" variant="primary" />
        :
        null
    )
}


const mapStateToProps = (state:IStore) =>({
    loading:state.products.loading
})

export default connect(mapStateToProps)(Loading); 