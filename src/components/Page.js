import React, {useEffect} from 'react';

import Container from './Container';

function Page(props) {

    useEffect(()=>{
        return(
            document.title = `${props.title} | ComplexApp`,
            window.scrollTo(0, 0)
        )
    }, [])

    return (
        <Container title={props.title} wide={props.wide}>
            {props.children}
        </Container>
    )
}

export default Page