import { useState, useEffect, useRef, useCallback } from 'react'

type InfiniteScrollType = {
  callbackFn: () => void // 데이터를 로드하는 콜백 함수
  hasNextPage: boolean // 다음 페이지가 있는지 여부를 나타내는 플래그
}

// useInfiniteScroll 훅 정의
export const useInfiniteScroll = ({ callbackFn, hasNextPage }: InfiniteScrollType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false) // 로딩 상태를 관리하는 상태
  const observerEl = useRef<HTMLDivElement>(null) // Intersection Observer가 관찰할 엘리먼트를 저장할 참조

  // Intersection Observer의 콜백 함수 정의
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0] // 관찰된 엔트리 중 첫 번째를 선택
      // 타겟이 뷰포트와 교차하고 로딩 중이지 않으며 다음 페이지가 있는 경우
      if (target.isIntersecting && !isLoading && hasNextPage) {
        setIsLoading(true)
        callbackFn() // 데이터를 로드하는 콜백 함수 호출
        setIsLoading(false)
      }
    },
    [callbackFn, isLoading, hasNextPage] // 콜백 함수와 상태가 변경될 때마다 콜백 함수가 재생성
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0 }) // Intersection Observer 인스턴스 생성
    const currentEl = observerEl.current // 현재 관찰 중인 엘리먼트 참조 가져오기
    if (currentEl) {
      observer.observe(currentEl) // 엘리먼트를 관찰 시작
    }
    return () => {
      if (currentEl) {
        observer.unobserve(currentEl) // 컴포넌트가 언마운트되거나 업데이트될 때 엘리먼트의 관찰을 해제
      }
    }
  }, [handleObserver]) // handleObserver가 변경될 때마다 useEffect가 실행됨

  return { observerEl, isLoading } // 관찰할 엘리먼트 참조와 로딩 상태를 반환
}
