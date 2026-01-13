/**
 * [Test] Error Boundary Test Page
 * [Purpose] Trigger error.tsx for testing
 */

'use client';

export default function TestErrorPage() {
  // Intentionally throw an error
  throw new Error('테스트 에러입니다. error.tsx가 정상적으로 작동하는지 확인하세요.');
  
  return null;
}
