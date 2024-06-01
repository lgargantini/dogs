import React, { useEffect, useState } from 'react'

interface State {
  status: 'resolved' | 'rejected' | null,
  url: string | null
}

const RandomDog = () => {
  const [ state, setState] = useState<State>({
    status: null,
    url: null
  })

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(json => setState({ url: json.message, status: 'resolved' }))
      .catch(() => setState({ url: null, status: 'rejected' }))
  }, [])

  const { status, url } = state
   
  if(status === 'resolved' && url) {
    return <div><img alt="doggo" src={url} /></div>
  } else if(status === 'rejected') {
    return <div><p>Whoops, sorry something went wrong</p></div>
  } else {
    return <div><p>,,,</p></div>
  } 
}

export default RandomDog;