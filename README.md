<h1>Online Email Newsletter Form Submission</h1>
<h2>Installation Instructions</h2>
<p>There are two ways to run the project:</p>
<ul>
    <li>At the github pages hosted site here: <a href="https://clockwerkz.github.io/checkboxchallenge/">Code Test</a>.</li>
    <li>Download the project and run a simple HTTP Server. A basic server is needed to properly run the fetch request the page makes to load in the newsletter options JSON data.
</ul>
<h2>Project Notes</h2>
<p>I created the page based off the provided mock up. There is a variable named <strong>PCT_SUCCESS</strong> that is the percentage of successful fetch requests. Lowering this number will increase the likelyhood of a "failed" fetch request. There is also a bit of error handling in place.. if a user forgets to choose a newsletter to sign up for, a message will pop up asking to choose one. However, if the user has selected the opt out checkbox under the email, it will process their request as if they wanted to opt out of any newsletters. Once the request returns from the server, the user has the option to return to the newsletter screen and modify or opt in/out.</p>
<p>I also ran the html and css through the w3c validator sites, as well as ran the website through lighthouse and made the appropriate changes to improve the performance to 97, as well as obtain 100s in a11y and SEO.</p>