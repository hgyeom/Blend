const formatTimeAgo = (dateString: string): string => {
  // 주어진 날짜 문자열을 Date 객체로 변환
  const createdDate = new Date(dateString)

  // 현재 시간에 9시간을 더한 Date 객체 생성 (kst 기준)
  const nowDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)

  // 주어진 날짜와 현재 날짜의 차이를 밀리초 단위로 계산
  const timeDifference = nowDate.getTime() - createdDate.getTime()

  const getDifferenceString = (value: number, unit: string) => `${Math.floor(value)}${unit} 전`

  // 밀리초를 초 단위로 변환
  const seconds = timeDifference / 1000

  // 초 단위 차이가 60보다 작으면 '방금 전' 반환
  if (seconds < 60) return `방금 전`

  // 초 단위를 분 단위로 변환
  // 분 차이가 60보다 작으면 몇 분 전인지 반환
  const minutes = seconds / 60
  if (minutes < 60) return getDifferenceString(minutes, '분')

  // 분 단위를 시간 단위로 변환
  // 시간 차이가 24보다 작으면 몇 시간 전인지 반환
  const hours = minutes / 60
  if (hours < 24) return getDifferenceString(hours, '시간')

  // 시간 단위를 일 단위로 변환
  // 일 차이가 7보다 작으면 몇 일 전인지 반환
  const days = hours / 24
  if (days < 7) return getDifferenceString(days, '일')

  // 일 단위를 주 단위로 변환
  // 주 차이가 5보다 작으면 몇 주 전인지 반환
  const weeks = days / 7
  if (weeks < 5) return getDifferenceString(weeks, '주')

  // 일 단위를 월 단위로 변환 (평균 30일로 계산)
  // 월 차이가 12보다 작으면 몇 개월 전인지 반환
  const months = days / 30
  if (months < 12) return getDifferenceString(months, '개월')

  // 일 단위를 년 단위로 변환 (평균 365일로 계산)
  // 몇 년 전인지 반환
  const years = days / 365
  return getDifferenceString(years, '년')
}

export default formatTimeAgo
