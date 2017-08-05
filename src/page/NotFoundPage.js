/**
 * 404找不到页面
 */

import React, {Component} from "react";


class NotFoundPage extends Component {
	render() {
		return (
			<section className="full-page">
				<div className="pd15">
					<svg viewBox="0 0 200 150" className="">
	                    <use xlinkHref="/assets/img/icon.svg#svg-404"/>
	                </svg>
                </div>
			</section>
		)
	}
}

export default NotFoundPage;