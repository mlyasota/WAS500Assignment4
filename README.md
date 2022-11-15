
# Note
The following link(s) do not exist: http://localhost:3000/book[#].html </br>
Please follow the redirects in [/books.html](http://localhost:3000/books.html)

## Static Example:
- book1 = http://localhost:3000/network-security-through-data-analysis.html
- book2 = http://localhost:3000/file-system-forensic-analysis.html
- book3 = http://localhost:3000/hacking-the-art-of-exploitation.html

</br>

# Known issues
- Completing the survey results in 404
  - Possible Reason:
    > Routing is only configured for static GET requests
  - Possible Fix: 
    > Set dynamic routing for POST