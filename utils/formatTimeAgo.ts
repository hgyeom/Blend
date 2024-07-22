const formatTimeAgo = (dateString: string): string => {
  const createdDate = new Date(dateString)

  const nowDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)

  // 주어진 날짜와 현재 날짜의 차이를 계산 (밀리초 단위)
  const timeDifference = nowDate.getTime() - createdDate.getTime()

  const cur = new Date('2023/01/10 09:00:00')
  const pre = new Date('2023/01/10 06:00:00')
  const diff = cur.getTime() - pre.getTime()

  // 밀리초를 다양한 시간 단위로 변환
  const minutesDifference = Math.floor(timeDifference / (60 * 1000))
  const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000))
  const daysDifference = Math.floor(timeDifference / (60 * 60 * 1000 * 24))
  const monthsDifference = Math.floor(diff / (60 * 60 * 1000 * 24 * 30)) // 평균 30일
  const yearsDifference = Math.floor(diff / (60 * 60 * 1000 * 24 * 365)) // 평균 365일

  if (yearsDifference > 0) {
    return `${yearsDifference}년 전`
  }
  if (monthsDifference > 0) {
    return `${monthsDifference}개월 전`
  }
  if (daysDifference > 1) {
    // 1일 이상인 경우
    return `${daysDifference}일 전`
  }
  if (daysDifference === 1) {
    // 1일인 경우
    return '어제'
  }
  if (hoursDifference > 0) {
    return `${hoursDifference}시간 전`
  }
  if (minutesDifference > 0) {
    return `${minutesDifference}분 전`
  }
  return '방금 전'
}

export default formatTimeAgo
