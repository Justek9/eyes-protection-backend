import React from 'react'
import { useState, useEffect } from 'react'
import { render } from 'react-dom'

const App = () => {
	const [status, setStatus] = useState('off')
	const [time, setTime] = useState(1200)
	const [timer, setTimer] = useState(null)

	const bell = new Audio('./sounds/bell.wav')

	const formatTime = secs => {
		const minutes = Math.floor(secs / 60)
		const seconds = secs % 60
		const secondsFormated = seconds < 10 ? '0' + seconds : seconds
		return `${minutes} : ${secondsFormated}`
	}

	const startTimer = () => {
		setTime(1200)
		setStatus('work')
		setTimer(
			setInterval(() => {
				setTime(time => time - 1)
			}, 1000)
		)
	}

	const stopTimer = () => {
		setTime(null)
		setStatus('off')
		setTimer(null)
		clearInterval(timer)
	}

	const closeApp = () => {
		window.close()
	}

	const playBell = () => {
		bell.play()
	}

	useEffect(() => {
		if (time === 0) {
			if (status === 'work') {
				setStatus('rest')
				setTime(20)
				playBell()
			} else {
				setStatus('work')
				setTime(1200)
				playBell()
			}
		}
	}, [time])

	return (
		<div>
			<h1>Protect your eyes</h1>
			{status === 'off' && (
				<div>
					<p>
						According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to
						rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.
					</p>
					<p>This app will help you track your time and inform you when it's time to rest.</p>
				</div>
			)}
			{status === 'work' && <img src='./images/work.png' />}
			{status === 'rest' && <img src='./images/rest.png' />}
			{status !== 'off' && <div className='timer'>{formatTime(time)}</div>}
			{status === 'off' && (
				<button className='btn' onClick={() => startTimer()}>
					Start
				</button>
			)}
			{status !== 'off' && (
				<button className='btn' onClick={() => stopTimer()}>
					Stop
				</button>
			)}
			<button className='btn btn-close' onClick={() => closeApp()}>
				X
			</button>
		</div>
	)
}

render(<App />, document.querySelector('#app'))
