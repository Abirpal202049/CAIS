'use client';
import React, { useEffect } from 'react'
import { useCreateAlert, useGetAllAlerts } from '../_api/alert_config';

type Props = {}

export default function AlertTypePage({ }: Props) {
  const { data, isLoading, isError } = useGetAllAlerts();
  const { mutate, data: abd, isPending } = useCreateAlert();

  const handleSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        alert('success');
      },
      onError: (err) => {
        alert('error');
      },
      onSettled: (data, error) => {
        alert('settled');
      }
    });
  }

  return (
    <div>AlertTypePage</div>
  )
}