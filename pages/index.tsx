import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import { GET_CHECK_INS } from '@/utils/graphql/queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { Table, Tag, message } from 'antd'
import { CheckInData } from '@/types/types'
import CheckInModal from '@/components/checkinModal'
import { ADD_NEW_CHECKIN } from '@/utils/graphql/mutations'
import CheckinDrawer from '@/components/drawer'

const { Column, ColumnGroup } = Table;

export default function Home() {
  const [fetchCheckins, {data, error}] = useLazyQuery(GET_CHECK_INS, {fetchPolicy: 'network-only'});
  const [addCheckin, {error: newCheckinError, loading: newCheckinLoading, data: newCheckinData}] = useMutation(ADD_NEW_CHECKIN);
  const [parsedData, setParsedData] = useState<CheckInData[]>();
  const [openCheckinModal, setOpenCheckinModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CheckInData>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchCheckins();
  }, []);


  useEffect(( ) => {
    if (data) {
      const parsed = data.check_in.map((item: any) => {
        return {
          name: item.name,
          id: item.id,
          image_url: item.image_url,
          comment: item.comment,
          created_at: item.created_at,
          owner: 'John Doerr',
          status: 'Checked In',
        }});
      setParsedData(parsed);
    }
  }, [data, error])

  const onCheckinAdd = useCallback(async (data: {name: string; image_url?: string; comment?: string}) => {
    console.log(data);
    if (data.name) {
      await addCheckin({
        variables: {
          name: data.name,
          image_url: data.image_url,
          comment: data.comment,
        },
      });
    }
  }, [addCheckin]);

  useEffect(() => {
    if (newCheckinData) {
      fetchCheckins();
      setOpenCheckinModal(false);
    }
    if (newCheckinError) {
      // newCheckinFailure();
    }
  }, [newCheckinData, newCheckinError, newCheckinLoading]);

  const handleRowClick = useCallback((record: CheckInData) => {
    return {
      onClick: () => {
         setSelectedRow(record);
         setDrawerOpen(true);
      },
    };
  }, []);

  return (
    <>
      <Head>
        <title>Test Task1</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner onClick={() => setOpenCheckinModal(true)}/>
        <div className={styles.tableContainer}>
          {parsedData && (<Table dataSource={parsedData} pagination={false} onRow={handleRowClick}>
            <Column title="Title" dataIndex="name" key="name" />
            <Column title="Owner" dataIndex="owner" key="owner" />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(status: string, _, i) => (
                <>
                  <Tag color="#79FFE1" key={i}>
                    {status}
                  </Tag>
                </>
              )}
            />
            <Column title="Created at" dataIndex="created_at" key="created_at" />
          </Table>)}
        </div>
        <CheckInModal  open={openCheckinModal} handleCancel={() => {setOpenCheckinModal(false)}} onSubmit={onCheckinAdd} confirmLoading={newCheckinLoading} />
        {selectedRow && <CheckinDrawer data={selectedRow} open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
      </main>
    </>
  )
}
