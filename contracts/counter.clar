;; define counter variable
(define-data-var counter int 0)

;; increment method
(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) 1))
    (ok (var-get counter))))

;; decrement method

;; counter getter
(define-public (get-counter)
  (ok (var-get counter)))
