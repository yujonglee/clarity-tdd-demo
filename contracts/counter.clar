;; define counter variable
(define-data-var counter int 0)

;; increment method

;; decrement method

;; counter getter
(define-public (get-counter)
  (ok (var-get counter)))
